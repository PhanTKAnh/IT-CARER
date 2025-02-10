import { Select, Space } from 'antd';
import { use } from 'react';


function SearchCity(props) {
    const {dataCities} = props;
    console.log(dataCities)
    const handleChange =(e) =>{
        console.log(e)
    }
    return (
        <>
            <Select
                mode="multiple"
                style={{
                    width: '100%',  // Chiếm toàn bộ không gian có thể

                }}
                defaultValue={["ALL"]}
                placeholder="Nhập tỉnh, Thành phố "
                onChange={handleChange}
                options={dataCities.map(city =>({
                    label: city.cityName,
                    value: city._id
                }))}
                
            />
        </>
    )
}
export default SearchCity;