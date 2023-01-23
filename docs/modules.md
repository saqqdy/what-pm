[index.md - v1.0.1](README.md) / Exports

# index.md - v1.0.1

## Table of contents

### References

- [default](modules.md#default)

### Interfaces

- [WhatPMResult](interfaces/WhatPMResult.md)

### Functions

- [whatPM](modules.md#whatpm)
- [whatPMSync](modules.md#whatpmsync)

## References

### default

Renames and re-exports [whatPM](modules.md#whatpm)

## Functions

### whatPM

▸ **whatPM**(`pkgPath`): `Promise`<[`WhatPMResult`](interfaces/WhatPMResult.md) \| `null`\>

#### Parameters

| Name      | Type     |
| :-------- | :------- |
| `pkgPath` | `string` |

#### Returns

`Promise`<[`WhatPMResult`](interfaces/WhatPMResult.md) \| `null`\>

#### Defined in

[index.ts:15](https://github.com/saqqdy/what-pm/blob/d89cb2c/src/index.ts#L15)

---

### whatPMSync

▸ **whatPMSync**(`pkgPath`): [`WhatPMResult`](interfaces/WhatPMResult.md) \| `null`

#### Parameters

| Name      | Type     |
| :-------- | :------- |
| `pkgPath` | `string` |

#### Returns

[`WhatPMResult`](interfaces/WhatPMResult.md) \| `null`

#### Defined in

[index.ts:67](https://github.com/saqqdy/what-pm/blob/d89cb2c/src/index.ts#L67)
