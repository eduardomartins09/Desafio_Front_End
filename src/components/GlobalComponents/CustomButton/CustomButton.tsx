"use client"

interface CustomButtonProps {
    btnType: "button" | "submit"
    containerStyles?: string
    title: string
    handleClick?: () => void
}

const CustomButton = ({ title, containerStyles, handleClick, btnType }: CustomButtonProps) => {
  return (
    <button
      type={btnType || "button"}
      className={`${containerStyles}`}
      onClick={handleClick}
    >
      {title}
    </button>
  )
}

export default CustomButton

