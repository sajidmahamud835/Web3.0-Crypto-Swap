require('@nomiclabs/hardhat-waffle')

module.exports = {
  solidity: '0.8.0',
  networks: {
    rinkeby: {
      url: 'https://eth-sepolia.g.alchemy.com/v2/GwFMMcdmjN0DksuPeovADvHgl8xtLmdG',
      accounts: [
        '8c7cdcffb638fe33a17dcfa945d81596d4ba244434446d753bbf8e291ac89ca1',
      ],
    },
  },
}
