import axios from 'axios'

export default {
    getProducts(params) {
        return axios.get('http://localhost:3000/products',
            {
                params
            }
        )
    }
}
