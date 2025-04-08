function ButtonPagination(props) {
    const { title, onClick, disabled } = props;
    return (
        <div className="pagination-buttons">
             <button 
            className="button-17" 
            role="button" 
            onClick={onClick} 
            disabled={disabled}
        >
            {title}
        </button>
        </div>
       
    );
}

export default ButtonPagination;