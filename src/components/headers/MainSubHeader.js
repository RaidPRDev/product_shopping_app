import React, { Component } from "react"

class MainSubHeader extends Component
{
    render() 
    {
        const { title, body } = this.props

        return (
            <nav className="main-sub-header">
                <div className="main-sub-header-inner">
                    <div className="sub-header-title">{title}</div>
                    <div className="sub-header-body">{body}</div>
                </div>
            </nav>
        )
    }
}

export default MainSubHeader