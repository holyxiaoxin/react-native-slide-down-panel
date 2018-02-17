# Change Log
All notable changes to this project will be documented in this file.
This project adheres to [Semantic Versioning](http://semver.org/).

## [1.0.3] - 2016-03-31
### Added
- `react-motion` animations

## [1.0.4] - 2016-04-01
### Changed
- When moving slider, it does not animate. Only animates when touch ends. This improves responsiveness/ UX.

## [1.0.5] - 2016-04-03
### Added
- Add new initialHeight props which can be used to set initial height.

### Changed
- Updated examples.
- Clean up code.

### Bug Fix
- Fix IOS not hiding overflow properly.

## [1.0.6] - 2016-04-03
### Bug Fix
- Container height will start from initialHeight props. However, the least minimum height is the handler height.
- Remove this.hasLoaded which cause container to animate unnecessarily when there is a state change in it's children. (On first render and second render, it was rendering differently even though there was no state change. This causes TextInput to lose focus due to animation on second render.)

## [1.0.7] - 2018-02-15
- Added PropType Validation
- Linted and prettier'd file
- Added .gitignore

## Changed

- updated README.md
- Added new example app
