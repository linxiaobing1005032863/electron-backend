import React from 'react'
import {Icon} from 'antd'


class Success extends React.Component {
    render() {
        return (
            <div className="finish">
                <Icon type="check-circle" style={{fontSize: 40, color: '#08c'}}/>
                <p className="text">完成</p>
            </div>
        )
    }
}
export default Success