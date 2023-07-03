# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

## [2.0.0](https://github.com/amplience/dc-extension-ecomm-toolkit/compare/v1.4.0...v2.0.0) (2023-07-03)


### ⚠ BREAKING CHANGES

* page cache fix, prefer cors for requests, add bigcommerce-cors docs (#12)

### Features

* add amplify deployment configuration ([#13](https://github.com/amplience/dc-extension-ecomm-toolkit/issues/13)) ([6b59402](https://github.com/amplience/dc-extension-ecomm-toolkit/commit/6b59402d39c740ccd69e0aa10a7d918ae8d309dc))
* page cache fix, prefer cors for requests, add bigcommerce-cors docs ([#12](https://github.com/amplience/dc-extension-ecomm-toolkit/issues/12)) ([b0680a2](https://github.com/amplience/dc-extension-ecomm-toolkit/commit/b0680a20c058a053b1b65a29cf9f3e57c4b48744))

## [1.4.0](https://github.com/amplience/dc-extension-ecomm-toolkit/compare/v1.3.1...v1.4.0) (2023-05-12)


### Features

* improve ui ([220d575](https://github.com/amplience/dc-extension-ecomm-toolkit/commit/220d5754c9719458a5905493ef67ae77643a398e))
* page count back to 12 ([798e340](https://github.com/amplience/dc-extension-ecomm-toolkit/commit/798e340728b382b371f8bb2eb31bd203fa6222ab))
* WIP pagination ([5df6717](https://github.com/amplience/dc-extension-ecomm-toolkit/commit/5df67174e483fffe8580e2fbc9c2dfae0d66630a))


### Bug Fixes

* Implemented a fix for matching. If there is no sku data fallback to ID ([91e8991](https://github.com/amplience/dc-extension-ecomm-toolkit/commit/91e899189d664e66e7aa95b2ac002473c70e8ea4))
* Looping DND fix from main branch to be safe ([821a13a](https://github.com/amplience/dc-extension-ecomm-toolkit/commit/821a13a65407e07100f6493b77bdd2568cb325f7))

## [1.3.0](https://github.com/amplience/dc-extension-ecomm-toolkit/compare/v1.2.0...v1.3.0) (2023-04-11)


### Features

* added product single object ([cd89092](https://github.com/amplience/dc-extension-ecomm-toolkit/commit/cd8909200f89bb5aaa9820dc5b0c34cd831d5b07))
* added single segment ([07cb158](https://github.com/amplience/dc-extension-ecomm-toolkit/commit/07cb15857fe9a97badc5d49abdc79d2c238c1f7c))


### Bug Fixes

* category multi-select fix ([05bb4a4](https://github.com/amplience/dc-extension-ecomm-toolkit/commit/05bb4a41af7c8a4286bd4adc849f4665c0d7f4d2))
* checking images[0] ([827a3ae](https://github.com/amplience/dc-extension-ecomm-toolkit/commit/827a3ae533ef609e2dbb40075ed3db863dee1a08))
* empty images ([a76e688](https://github.com/amplience/dc-extension-ecomm-toolkit/commit/a76e6885dbdef0aa406ad0311f0eda9db6e3261c))
* fix customer groups string mode ([ec2cff8](https://github.com/amplience/dc-extension-ecomm-toolkit/commit/ec2cff8296faecf78f2c8b04bcc4f82f7e195113))
* fix product list by category height ([226dcc9](https://github.com/amplience/dc-extension-ecomm-toolkit/commit/226dcc92892a312a68d4f5077dc94bae9aaf13e6))
* fix product selector (object) ([0384fbf](https://github.com/amplience/dc-extension-ecomm-toolkit/commit/0384fbfb2814f51e93890780d9b1688655194085))
* patch release ([7cc9855](https://github.com/amplience/dc-extension-ecomm-toolkit/commit/7cc985595d2c661de9fdd230bd02564eba2c114f))
* product selector shouldn't update field value when loading ([f88b225](https://github.com/amplience/dc-extension-ecomm-toolkit/commit/f88b2256ddfa0b575155c91bbe8b8d59cdc5ec00))
* set loading to false when there is no value ([a2ae7d9](https://github.com/amplience/dc-extension-ecomm-toolkit/commit/a2ae7d99c1c3a5b7ac036c2bfd4e8772c301b559))
* using category tree ([a13bf5a](https://github.com/amplience/dc-extension-ecomm-toolkit/commit/a13bf5a79e976bf990089c6d371ee87fdddb1962))
* using slug ([52ab98b](https://github.com/amplience/dc-extension-ecomm-toolkit/commit/52ab98b7344c9f58d50facb2efd1ea5dd2202fa4))

## [1.2.0](https://github.com/amplience/dc-extension-ecomm-toolkit/compare/v1.1.0...v1.2.0) (2022-11-17)


### Features

* dual mode product search WIP ([91f3612](https://github.com/amplience/dc-extension-ecomm-toolkit/commit/91f36126a315fb45de322d3bd2d24e5f48b4e0fa))
* remove redundant title ([01d36da](https://github.com/amplience/dc-extension-ecomm-toolkit/commit/01d36da0424c97559fe3a01e1fe7e7a88e4b4fa9))
* sortable drag and drop list ([5616d3b](https://github.com/amplience/dc-extension-ecomm-toolkit/commit/5616d3bdcf8c087aefcf9890402655a2eab3be1c))
* style match DC a bit more ([786de77](https://github.com/amplience/dc-extension-ecomm-toolkit/commit/786de77c20e05e7e629dc3daf13b01ea14a5ffc1))
* use maxItems validation, overwrite when doing single select ([101e10c](https://github.com/amplience/dc-extension-ecomm-toolkit/commit/101e10c33bae010ed4d3e5faa33dbf45217b58a2))


### Bug Fixes

* add/remove functional with sortable list ([ba10948](https://github.com/amplience/dc-extension-ecomm-toolkit/commit/ba109488a04883f05a98e4ad01aab5549ad4098f))
* can't add teh same item more than once. ([a33c3c1](https://github.com/amplience/dc-extension-ecomm-toolkit/commit/a33c3c130b0aca8371c5672758b3f3f4012cb5d8))
* comment in PR ([4fc0bbe](https://github.com/amplience/dc-extension-ecomm-toolkit/commit/4fc0bbe3add4a071412500ed93503bb2d40dac7c))
* display selected products above search box ([09a538b](https://github.com/amplience/dc-extension-ecomm-toolkit/commit/09a538b4f989c652a0271a4e44d5f4a705e5e29a))
* fix maxItems limit on product selector ([3fa394d](https://github.com/amplience/dc-extension-ecomm-toolkit/commit/3fa394d8fe19ad114a3aa72878ed15e137aa1137))
* last 2 comments ([d668ee7](https://github.com/amplience/dc-extension-ecomm-toolkit/commit/d668ee755ccc1df5d7934b066ebf52a26842b7b1))
* reduce top margin on selected products ([7a8e5a2](https://github.com/amplience/dc-extension-ecomm-toolkit/commit/7a8e5a2433e42189505f02cd0ac5a718fcb57726))
* remove unused imports ([1bf5099](https://github.com/amplience/dc-extension-ecomm-toolkit/commit/1bf5099adda1275ddc3140b3cfda76d85cd66737))
* set page 1 on results only ([e1806dd](https://github.com/amplience/dc-extension-ecomm-toolkit/commit/e1806dd29cd14dd6ba1fe4e0762ad16ac781a5e5))
* small style tweak to search box ([57c5a56](https://github.com/amplience/dc-extension-ecomm-toolkit/commit/57c5a56575abac8b784d2f3c35eecc8999a592ea))

## [1.1.0](https://github.com/amplience/dc-extension-ecomm-toolkit/compare/v1.0.0...v1.1.0) (2022-11-01)


### Bug Fixes

* Updated to r.2.1 demostore-integrations with count=1000 ([76c05d9](https://github.com/amplience/dc-extension-ecomm-toolkit/commit/76c05d9730dd4655e68e973bc336589f59f3345d))

## [1.0.0](https://github.com/amplience/dc-extension-ecomm-toolkit/compare/v0.1.1...v1.0.0) (2022-09-06)

### 0.1.1 (2022-09-06)


### Bug Fixes

* clear UI value if val = null ([f27bcee](https://github.com/amplience/dc-extension-ecomm-toolkit/commit/f27bcee48b2491aedb59f3ffe5912551c23d2452))
* NOVADEV-636 ([80c25e9](https://github.com/amplience/dc-extension-ecomm-toolkit/commit/80c25e96fc05ddb62ff629ff9e29ac5d650f056a))