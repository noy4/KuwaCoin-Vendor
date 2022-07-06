import { DeployFunction } from 'hardhat-deploy/types'

const func: DeployFunction = async (hre) => {
  const { getNamedAccounts, deployments, ethers } = hre
  const { deploy } = deployments
  const { deployer } = await getNamedAccounts()

  const kuwaCoin = await ethers.getContract('KuwaCoin', deployer)

  await deploy('Vendor', {
    from: deployer,
    args: [kuwaCoin.address],
    log: true,
  })

  const vendor = await ethers.getContract('Vendor', deployer)
  await kuwaCoin.transfer(vendor.address, ethers.utils.parseEther('1000'))
}
export default func
func.tags = ['Vendor']
