import { Configuration } from 'webpack'

export type Options =
    | string
    | {
          [index: string]: any
      }

export interface ConfigModuleParams {
    options?: Options
}

export type Mode = Configuration['mode']
export type Output = Configuration['output']
export type Target = Configuration['target']
export type WEBPACK_ENV = {
    WEBPACK_BUNDLE: boolean
    WEBPACK_BUILD: boolean
}
export type WEBPACK_ARGS = {
    mode: Mode
    config: string[]
    env: WEBPACK_ENV
}
