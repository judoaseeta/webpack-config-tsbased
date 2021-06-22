import { Configuration } from 'webpack'
import { PluginOptions } from 'mini-css-extract-plugin'
export type Options =
    | string
    | {
          [index: string]: any
      }

export interface ConfigModuleParams {
    options?: Options
}
export interface StyleSheetConfigModuleParams {
    cssOptions?: Options
    styleLoaderOptions?: Options
    cssExtractLoaderOptions?: Options
    cssExtractPluginOptions?: PluginOptions
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
