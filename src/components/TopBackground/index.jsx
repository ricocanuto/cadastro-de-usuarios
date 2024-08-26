import PropTypes from 'prop-types'

import { TopBackground } from './styles'

function DefaultTopBackground({children, ...props}) {

    return (
        <TopBackground {...props}> {children} </TopBackground>
        
    )
}
DefaultTopBackground.propTypes = {
    children: PropTypes.node.isRequired
}

export default DefaultTopBackground;