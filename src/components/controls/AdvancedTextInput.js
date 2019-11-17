import React, { Component } from "react"
import PropTypes from "prop-types"

class AdvancedTextInput extends Component
{
    static propTypes = {
        name: PropTypes.string.isRequired,
        text: PropTypes.string,
        placeholder: PropTypes.string,
        autocomplete: PropTypes.string,
        autocorrect: PropTypes.string,
        spellcheck: PropTypes.string,
        inputmode: PropTypes.string,
        pattern: PropTypes.string,
        type: PropTypes.string,
        maxLength: PropTypes.string,
        classes: PropTypes.string,
        onChange: PropTypes.func,
        onFocus: PropTypes.func,
        onFormat: PropTypes.func
    }
    static defaultProps = {
        text: "",
        placeholder: "",
        autocomplete: "",
        autocorrect: "",
        spellcheck: "",
        inputmode: "",
        pattern: "",
        type: "text",
        maxLength: null,
        classes: null,
        onChange: null,
        onFocus: null,
        onFormat: null
    }

    inputStyles = {}

    constructor(props)
    {
        super(props)

        this.state = {
            [this.props.name]: this.props.text
        }
    }

    componentDidUpdate(nextProps, nextState)
    {
        const { value } = nextState
        const { onChange } = this.props
        
        // if value changed, trigger change callback if available
        if (this.state.value !== value)
        {
            onChange && onChange(value)
        }

        return true
    }

    handleChange = (e) => 
    {
        const { name, value } = e.target
        const { onFormat } = this.props
        
        let inputVal = value

        if (typeof onFormat === 'function') 
        {
            inputVal = onFormat(inputVal)
        }

        this.setState({[name]: inputVal})
    }

    handleFocus = (e) => 
    {
        const { name, onFocus } = this.props

        onFocus && onFocus({name:name, event: e})
    }

    render()
    {
        const { name, 
            placeholder, 
            pattern, 
            type, 
            maxLength, 
            classes, 
            autocomplete, 
            autocorrect,
            spellcheck 
        } = this.props

        const classList = (classes !== null) ? " " + classes : ""

        const value = this.state[name]
        let hiddenText = value.substr(value.length - 4, value.length)

        return (
            <span className={"adv-text-input" + classList}>
                <span className="text-input-hidden-field" aria-hidden="true">
                    <span className="text-input-hidden-field-text">{hiddenText}</span>
                </span>
                <span className="text-input-container">
                    <input 
                        type={type} 
                        name={name} 
                        value={this.state[name]} 
                        placeholder={placeholder} 
                        pattern={pattern} 
                        autocomplete={autocomplete} 
                        autocorrect={autocorrect} 
                        spellcheck={spellcheck} 
                        maxLength={maxLength}
                        onChange={this.handleChange}
                        onFocus={this.handleFocus}
                    />
                </span>
            </span>
        )
    }
}

export default AdvancedTextInput