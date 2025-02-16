import { Select, Space } from 'antd';


function SearchCity(props) {
    const {dataCities, onCityChange, defaultValue} = props;
    const handleChange =(options) =>{
        if(onCityChange){
            onCityChange(options)
        }
        
    }
    return (
        <>
            <Select
                mode="multiple"
                style={{
                    width: '100%',  // Chiếm toàn bộ không gian có thể

                }}
                placeholder="Nhập tỉnh, Thành phố "
                name="city"
                onChange={handleChange}
                defaultValue={defaultValue}
                options={dataCities.map(city =>({
                    label: city.CityName,
                    value: city.CityName
                }))}
                
            />
        </>
    )
}
export default SearchCity;