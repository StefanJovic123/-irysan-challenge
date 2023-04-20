# Nasa UI

### Start commands
1. use node v16.10.0
2. run `yarn`
3. run `yarn start`
4. server will start at port: 3000


### Architecture

Folder structure
1. components - holds all components that are used throught the app
2. congis - holds configurations constants including routing config
3. constants- holds all constant values
4. services - holds all business logic that is specific to third party services or it holds abstractions of libraries like axios which can be replaced easily with something else
5. utils - holds all utility methods
6. views - represents components that are attached to specific routing component
7. assets - holds all css/images/svgs that are necessary