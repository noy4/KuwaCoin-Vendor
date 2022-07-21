import { DeployFunction } from 'hardhat-deploy/types'

const func: DeployFunction = async (hre) => {
  const { getNamedAccounts, deployments, ethers } = hre
  const { deploy } = deployments
  const { deployer } = await getNamedAccounts()
  await deploy('KuwaCoin', {
    from: deployer,
    args: [ethers.utils.parseEther('100000')],
    log: true,
  })
  const yourToken = await ethers.getContract('KuwaCoin', deployer)
  const balance = await yourToken.balanceOf(deployer)
  console.log('balance:', ethers.utils.formatEther(balance))
}
export default func
func.tags = ['KuwaCoin']
