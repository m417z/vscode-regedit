import * as reg from 'native-reg';

function splitKeyPath(keyPath: string) {
	let i = keyPath.indexOf('\\');
	if (i === -1) {
		i = keyPath.length;
	}
	let rootKey;
	switch (keyPath.slice(0, i).toUpperCase()) {
		case 'HKEY_CLASSES_ROOT':
			rootKey = reg.HKCR;
			break;
		case 'HKEY_CURRENT_USER':
			rootKey = reg.HKCU;
			break;
		case 'HKEY_LOCAL_MACHINE':
			rootKey = reg.HKLM;
			break;
		case 'HKEY_USERS':
			rootKey = reg.HKU;
			break;
		case 'HKEY_CURRENT_CONFIG':
			rootKey = reg.HKEY.CURRENT_CONFIG;
			break;
		default:
			throw new Error('Unsupported registry path');
	}
	return {
		rootKey,
		subKey: keyPath.slice(i + 1)
	};
}

function typeToString(type: reg.ValueType) {
	let str = reg.ValueType[type];
	switch (str) {
		case 'DWORD_LITTLE_ENDIAN':
			str = 'DWORD';
			break;

		case 'QWORD_LITTLE_ENDIAN':
			str = 'QWORD';
			break;

		default:
			break;
	}

	return 'REG_' + str;
}

function myParseValue(valueRaw: reg.Value) {
	switch (valueRaw.type) {
		case reg.ValueType.BINARY:
		default:
			return valueRaw.toString('hex').replace(/(..)/g, '$1 ').trim();

		case reg.ValueType.MULTI_SZ:
			return (reg.parseValue(valueRaw) as string[]).join(', ');

		case reg.ValueType.DWORD:
			return reg.parseValue(valueRaw) as number;

		case reg.ValueType.QWORD:
			return (reg.parseValue(valueRaw) as bigint).toString();

		case reg.ValueType.SZ:
		case reg.ValueType.EXPAND_SZ:
			return reg.parseValue(valueRaw) as string;
	}
}

function myValueToRawData(data: string | number, type: reg.ValueType) {
	switch (type) {
		case reg.ValueType.BINARY:
		default:
			return Buffer.from((data as string).replace(/\s/gm, ''), 'hex');

		case reg.ValueType.MULTI_SZ:
			return reg.formatMultiString(
				(data as string).split(',').map(x => x.trim()).filter(x => x !== ''));

		case reg.ValueType.DWORD:
			return reg.formatDWORD(data as number);

		case reg.ValueType.QWORD:
			return reg.formatQWORD(BigInt(data));

		case reg.ValueType.SZ:
		case reg.ValueType.EXPAND_SZ:
			return reg.formatString(data as string);
	}
}

function getSubKeysIntrenal(rootKey: reg.HKEY, subKey: string) {
	const key = reg.openKey(
		rootKey,
		subKey,
		reg.Access.QUERY_VALUE | reg.Access.ENUMERATE_SUB_KEYS);
	if (!key) {
		throw new Error('Registry key doesn\'t exist');
	}

	try {
		return reg.enumKeyNames(key).sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()));
	} finally {
		reg.closeKey(key);
	}
}

export function getSubKeys(keyPath: string) {
	const { rootKey, subKey } = splitKeyPath(keyPath);
	return getSubKeysIntrenal(rootKey, subKey);
}

export function getKeyTree(keyPath: string) {
	type Tree = {
		name: string;
		children?: Tree;
	}[]

	const { rootKey, subKey } = splitKeyPath(keyPath);
	const rootKeyName = 'HKEY_' + reg.HKEY[rootKey];
	const keyPathParts = subKey === '' ? [] : subKey.split('\\');

	const tree: Tree = [{
		name: rootKeyName,
		children: []
	}];
	let treeIter = tree[0];

	let subKeyIter = '';
	for (const keyPathPart of [''].concat(keyPathParts)) {
		if (keyPathPart !== '') {
			const next = treeIter.children?.find(x => x.name.toLowerCase() === keyPathPart.toLowerCase());
			if (!next) {
				break;
			}

			if (subKeyIter !== '') {
				subKeyIter += '\\';
			}

			subKeyIter += next.name;
			treeIter = next;
		}

		const children = getSubKeysIntrenal(rootKey, subKeyIter).map(x => ({
			name: x,
			children: []
		}));

		treeIter.children = children.length > 0 ? children : undefined;
	}

	let retrievedKey = rootKeyName;
	if (subKeyIter !== '') {
		retrievedKey += '\\' + subKeyIter;
	}

	return {
		retrievedKey,
		tree
	};
}

export function createKey(keyPath: string) {
	const { rootKey, subKey } = splitKeyPath(keyPath);

	let key = reg.openKey(rootKey, subKey, reg.Access.QUERY_VALUE);
	if (key) {
		reg.closeKey(key);
		throw new Error('Registry key already exists');
	}

	key = reg.createKey(rootKey, subKey, 0);
	reg.closeKey(key);
}

export function renameKey(keyPath: string, newSubKey: string) {
	const { rootKey, subKey } = splitKeyPath(keyPath);

	const key = reg.openKey(
		rootKey,
		subKey,
		reg.Access.WRITE);
	if (!key) {
		throw new Error('Registry key doesn\'t exist');
	}

	try {
		reg.renameKey(key, null, newSubKey);
	} finally {
		reg.closeKey(key);
	}
}

export function deleteTree(keyPath: string) {
	const { rootKey, subKey } = splitKeyPath(keyPath);

	const key = reg.openKey(
		rootKey,
		subKey,
		reg.Access.QUERY_VALUE | reg.Access.SET_VALUE | reg.Access.DELETE | reg.Access.ENUMERATE_SUB_KEYS);
	if (!key) {
		return false;
	}

	try {
		if (!reg.deleteTree(key, null)) {
			return false;
		}

		return reg.deleteKey(key, '');
	} finally {
		reg.closeKey(key);
	}
}

export function getKeyValues(keyPath: string) {
	const { rootKey, subKey } = splitKeyPath(keyPath);

	const key = reg.openKey(
		rootKey,
		subKey,
		reg.Access.QUERY_VALUE);
	if (!key) {
		throw new Error('Registry key doesn\'t exist');
	}

	try {
		const values = reg.enumValueNames(key).sort((a, b) => {
			// Place empty value (Default) first.
			if (a.length === 0 && b.length > 0) {
				return -1;
			}

			if (b.length === 0 && a.length > 0) {
				return 1;
			}

			return a.toLowerCase().localeCompare(b.toLowerCase());
		});
		return values.map(valueName => {
			let type: string;
			let value: string | number;

			const valueRaw = reg.getValueRaw(key, null, valueName, reg.GetValueFlags.NO_EXPAND);
			if (valueRaw) {
				type = typeToString(valueRaw.type);
				value = myParseValue(valueRaw);
			} else {
				type = '(query error)';
				value = '(query error)';
			}

			return {
				name: valueName,
				type,
				value
			};
		});
	} finally {
		reg.closeKey(key);
	}
}

export function renameValue(keyPath: string, oldName: string, newName: string) {
	const { rootKey, subKey } = splitKeyPath(keyPath);

	const key = reg.openKey(
		rootKey,
		subKey,
		reg.Access.QUERY_VALUE | reg.Access.SET_VALUE);
	if (!key) {
		throw new Error('Registry key doesn\'t exist');
	}

	try {
		if (reg.getValueRaw(key, null, newName, reg.GetValueFlags.NO_EXPAND)) {
			throw new Error('Target name already exists');
		}

		const valueRaw = reg.getValueRaw(key, null, oldName, reg.GetValueFlags.NO_EXPAND);
		if (!valueRaw) {
			throw new Error('Registry value doesn\'t exist');
		}

		reg.setValueRaw(key, newName, valueRaw.type, valueRaw);
		reg.deleteValue(key, oldName);
	} finally {
		reg.closeKey(key);
	}
}

export function setValueData(keyPath: string, name: string, type: string, data: string | number) {
	const { rootKey, subKey } = splitKeyPath(keyPath);

	const key = reg.openKey(
		rootKey,
		subKey,
		reg.Access.QUERY_VALUE | reg.Access.SET_VALUE);
	if (!key) {
		throw new Error('Registry key doesn\'t exist');
	}

	try {
		const valueRaw = reg.getValueRaw(key, null, name, reg.GetValueFlags.NO_EXPAND);
		if (!valueRaw) {
			throw new Error('Registry value doesn\'t exist');
		}

		if (type !== typeToString(valueRaw.type)) {
			throw new Error('Registry value type doesn\'t match');
		}

		const dataRaw = myValueToRawData(data, valueRaw.type);
		reg.setValueRaw(key, name, valueRaw.type, dataRaw);
		return myParseValue(Object.assign(dataRaw, { type: valueRaw.type }));
	} finally {
		reg.closeKey(key);
	}
}

export function createValue(keyPath: string, name: string, type: string, data: string | number) {
	const { rootKey, subKey } = splitKeyPath(keyPath);

	const key = reg.openKey(
		rootKey,
		subKey,
		reg.Access.QUERY_VALUE | reg.Access.SET_VALUE);
	if (!key) {
		throw new Error('Registry key doesn\'t exist');
	}

	try {
		const valueRaw = reg.getValueRaw(key, null, name, reg.GetValueFlags.NO_EXPAND);
		if (valueRaw) {
			throw new Error('Registry value already exists');
		}

		const regType = reg.ValueType[type.toUpperCase().replace(/^REG_/, '') as keyof typeof reg.ValueType];
		if (regType === undefined) {
			throw new Error('Unsupported registry value type');
		}

		const dataRaw = myValueToRawData(data, regType);
		reg.setValueRaw(key, name, regType, dataRaw);
		return myParseValue(Object.assign(dataRaw, { type: regType }));
	} finally {
		reg.closeKey(key);
	}
}

export function deleteValue(keyPath: string, name: string) {
	const { rootKey, subKey } = splitKeyPath(keyPath);

	const key = reg.openKey(
		rootKey,
		subKey,
		reg.Access.QUERY_VALUE | reg.Access.SET_VALUE);
	if (!key) {
		throw new Error('Registry key doesn\'t exist');
	}

	try {
		return reg.deleteValue(key, name);
	} finally {
		reg.closeKey(key);
	}
}
