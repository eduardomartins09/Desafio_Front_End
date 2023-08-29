interface CustomLabelProps {
    htmlFor: string
    labelStyles: string
    title: string
}

const CustomLabel = ({ htmlFor, labelStyles, title }: CustomLabelProps) => {
  return (
    <label 
        htmlFor={htmlFor}
        className={labelStyles}
    >
        {title}
    </label>
  )
}

export default CustomLabel