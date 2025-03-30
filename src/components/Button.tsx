interface ButtonProps {
    style: 'primary' | 'secondary'
    label: string
    iconName?: string
    iconPosition?: 'left' | 'right'
    alone?: boolean
    onClick?: () => void
}

function Button({
                    style,
                    label,
                    iconName,
                    iconPosition,
                    alone,
                    onClick,
                }: ButtonProps) {
    let buttonClass = ''

    if (style === 'primary') {
        buttonClass =
            'text-stone-50 bg-blue-500 px-3 py-2 rounded-lg hover:bg-blue-400 hover:border-blue-400 cursor-pointer'
    } else if (style === 'secondary') {
        buttonClass =
            'text-blue-500 border border-blue-500 px-3 py-2 rounded-lg hover:bg-slate-900 cursor-pointer'
    }

    const buttonText = alone ? '' : label

    return (
        <button
            className={`${buttonClass} flex gap-1 font-normal leading-none tracking-normal text-center`}
            onClick={onClick}
        >
            {iconName && (iconPosition === 'left' || alone) && (
                <i className={`uil ${iconName}`}></i>
            )}
            {buttonText}
            {iconName && iconPosition === 'right' && !alone && (
                <i className={`uil ${iconName}`}></i>
            )}
        </button>
    )
}

export default Button