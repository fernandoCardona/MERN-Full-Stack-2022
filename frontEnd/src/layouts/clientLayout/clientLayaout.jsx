//IMPORTS DE REACT:
//IMPORTS DEPENDENCIAS DE TERCEROS:
//IMPORTS DEPENDENCIAS DE LA APP:
//IMPORTS COMPONENTS DE LA APP:

export const clientLayaout = (props) => {
    const { children } = props;


    return (
        <div>
            <h2>Usando el ClientLayout</h2>
            { children }
        </div>
    )
}
