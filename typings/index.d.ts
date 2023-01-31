declare function whatPM(pkgPath: string): Promise<WhatPMResult | null>;
export default whatPM;
export { whatPM }

export declare interface WhatPMResult {
    name: string;
    version: string;
    isWorkspace: boolean;
}

export declare function whatPMSync(pkgPath: string): WhatPMResult | null;

export { }
