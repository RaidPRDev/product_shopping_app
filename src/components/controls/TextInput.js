import React, { Component } from "react"
import PropTypes from "prop-types"

class TextInput extends Component
{
    static propTypes = {
        name: PropTypes.string.isRequired,
        text: PropTypes.string,
        tabIndex: PropTypes.string,
        placeholder: PropTypes.string,
        autocomplete: PropTypes.string,
        autocorrect: PropTypes.string,
        spellcheck: PropTypes.string,
        inputmode: PropTypes.string,
        pattern: PropTypes.string,
        type: PropTypes.string,
        maxLength: PropTypes.string,
        classes: PropTypes.string,
        value: PropTypes.func,
        onFocus: PropTypes.func,
        onBlur: PropTypes.func,
        onChange: PropTypes.func,
        onKeyDown: PropTypes.func,
        onFormat: PropTypes.func
    }
    static defaultProps = {
        text: "",
        tabIndex: "0",
        placeholder: "",
        autocomplete: "",
        autocorrect: "off",
        spellcheck: "false",
        inputmode: "",
        pattern: "",
        type: null,
        maxLength: null,
        classes: null,
        value: null,
        onFocus: null,
        onBlur: null,
        onChange: null,
        onKeyDown: null,
        onFormat: null
    }

    constructor(props)
    {
        super(props)

        this.textInput = React.createRef();

        this.state = {
            [this.props.name]: this.props.text,
            showLabel: false
        }
    }

    value = () =>
    {
        return this.state[this.props.name]
    }

    handleChange = (e) => 
    {
        const { name, value } = e.target
        const { tabIndex, onFormat, onChange } = this.props
        
        let inputVal = value, showLabel = false

        // optional format on value
        if (typeof onFormat === 'function') inputVal = onFormat(inputVal)

        // optional label will show when input is changed
        showLabel = inputVal && inputVal.length > 0

        // if value changed, update state
        if (this.state[name] !== inputVal)
        {
            this.setState({[name]: inputVal, showLabel:showLabel })
            onChange && onChange({name:name, value: inputVal, tabIndex:tabIndex, event: e})
        }
    }

    handleKeyDown = (e) => 
    {
        const { name } = e.target
        const { key } = e
        const { tabIndex, onKeyDown } = this.props
        
        onKeyDown && onKeyDown({name:name, value:this.state[name], tabIndex:tabIndex, key:key, event: e})        
    }

    handleFocus = (e) => 
    {
        const { name, tabIndex, onFocus } = this.props

        onFocus && onFocus({name:name, tabIndex:tabIndex, event: e})
    }

    handleBlur = (e) => 
    {
        const { name, tabIndex, onBlur } = this.props

        onBlur && onBlur({name:name, tabIndex:tabIndex, value:this.state[name], event: e})
    }
   
    focus()
    {
        this.textInput.current.focus()
    }

    render()
    {
        const { tabIndex, name, placeholder, pattern, type, maxLength, classes } = this.props
        const { autocomplete, autocorrect, spellcheck, inputmode } = this.props

        const classList = (classes !== null) ? " " + classes : ""

        const labelClass = this.state.showLabel ? " show" : ""

        return (
            <div className={"text-input" + classList}>
                <span className={"text-input-label" + labelClass}>{placeholder}</span>
                <div className="text-input-inner">
                    <input 
                        id={name}
                        ref={this.textInput}
                        tabIndex={tabIndex}
                        type={type} 
                        name={name} 
                        value={this.state[name]} 
                        placeholder={placeholder} 
                        pattern={pattern} 
                        maxLength={maxLength}
                        autoComplete={autocomplete} 
                        autoCorrect={autocorrect} 
                        spellCheck={spellcheck} 
                        inputMode={inputmode} 
                        onChange={this.handleChange}
                        onKeyDown={this.handleKeyDown}
                        onFocus={this.handleFocus}
                        onBlur={this.handleBlur}
                    />
                </div>
            </div>
        )
    }
}

export default TextInput