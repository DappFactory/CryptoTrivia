# Build and test script

# Get the source directory
SOURCEDIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

# Delete build folder
rm -rf "$SOURCEDIR/build"

# Compile contracts with truffle
truffle compile

# Migrate contracts to blockchain with truffle
truffle migrate

# Run contract unit tests with truffle
#ctruffle test
