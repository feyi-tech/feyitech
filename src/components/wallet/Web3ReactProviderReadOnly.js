import { createWeb3ReactRoot } from '@web3-react/core'
import { READ_ONLY_WALLET } from '../../utils/c';


const Provider = createWeb3ReactRoot(READ_ONLY_WALLET.key)

const Web3ReactProviderReadOnly = ({ children, getLibrary }) => {
  return (
    <Provider getLibrary={getLibrary}>
      {children}
    </Provider>
  )
}

export default Web3ReactProviderReadOnly;