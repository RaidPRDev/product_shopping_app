import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

// This compoment is stateless and 'uncontrolled'
// so its checked state is determined by and outside element ( parent )
class Radiobox extends PureComponent 
{
    static propTypes = {
        name: PropTypes.string.isRequired,
        label: PropTypes.string,
        value: PropTypes.any.isRequired,
        handleRadioboxChange: PropTypes.func,
        classes: PropTypes.string
    }

    static defaultProps = {
        label: null,
        classes: null,
        handleRadioboxChange: null
    }

    handleRadioboxChange(e) 
    {
        const { name, label, value, handleRadioboxChange } = this.props
        const { checked } = e.target

        handleRadioboxChange && handleRadioboxChange({ 
            name: name, 
            label: label, 
            value: value, 
            isChecked: checked
        });
    }

    render() 
    {
        const { name, label, classes, selected } = this.props;

        const classList = (classes !== null) ? " " + classes : ""

        return (
            <div className={"radio-box" + classList}>
                <div className="radio-box-inner">
                    <label className="radio-box-label">
                        <input
                            type="radio"
                            name={name}
                            value={label}
                            checked={selected}
                            onChange={(e) => this.handleRadioboxChange(e)}
                        />
                        <span className="radio-box-checkmark"></span>
                        {label}
                    </label>
                </div>
            </div>
        )
    }
}

export default Radiobox;