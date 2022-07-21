import { parseEther } from 'ethers/lib/utils'
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
  await kuwaCoin.transfer(vendor.address, ethers.utils.parseEther('95000'))
  const signer = await ethers.getSigner(deployer)
  await signer.sendTransaction({ to: vendor.address, value: parseEther('1') })
}
export default func
func.tags = ['Vendor']
