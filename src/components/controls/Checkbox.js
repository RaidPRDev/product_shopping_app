import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

// This compoment is stateless and 'uncontrolled'
// so its checked state is determined by and outside element ( parent )
class Checkbox extends PureComponent 
{
    static propTypes = {
        name: PropTypes.string.isRequired,
        label: PropTypes.string,
        handleCheckboxChange: PropTypes.func,
        classes: PropTypes.string
    }

    static defaultProps = {
        label: null,
        classes: null,
        handleRadioboxChange: null
    }

    toggleCheckboxChange(e) 
    {
        const { name, label, handleCheckboxChange } = this.props;
        const { checked } = e.target

        handleCheckboxChange && handleCheckboxChange({ 
            name: name, 
            label: label, 
            isChecked: checked
        });
    }

    render() 
    {
        const { name, label, classes, selected } = this.props;

        const classList = (classes !== null) ? " " + classes : ""

        return (
            <div className={"check-box" + classList}>
                <div className="check-box-inner">
                    <label className="check-box-label">
                        <input
                            type="checkbox"
                            name={name}
                            value={label}
                            checked={selected}
                            onChange={(e) => this.toggleCheckboxChange(e)}
                        />
                        <span className="check-box-checkmark"></span>
                        {label}
                    </label>
                </div>
            </div>
        )
    }
}

export default Checkbox;