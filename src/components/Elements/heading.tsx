type Props = {
    children: React.ReactNode
    varian?: string
}

export const H1: React.FC<Props> = (props) => {
    const {children,varian} = props
    return (
        <p 
        className={`text-ls sm:mt-2 font-bold text-xl ${varian}`}>{children}</p>
    )
}

export const H2: React.FC<Props> = (props) => {
    const {children,varian} = props
    return (
        <p 
        className={`block text-slate-700 text-lg font-medium mb-2 ${varian}`}>{children}</p>
    )
}