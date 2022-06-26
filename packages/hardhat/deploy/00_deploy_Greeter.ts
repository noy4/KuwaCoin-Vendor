import { HardhatRuntimeEnvironment } from 'hardhat/types'
import { DeployFunction } from 'hardhat-deploy/types'

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { getNamedAccounts, deployments } = hre
  const { deploy } = deployments
  const { deployer } = await getNamedAccounts()
  await deploy('Greeter', {
    from: deployer,
    args: ['Hey yo'],
    log: true,
  })
}
export default func
func.tags = ['Greeter']
