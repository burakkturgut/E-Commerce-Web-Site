import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import type { ProductType } from '../types/Types'
import { useNavigate } from 'react-router-dom';
import '../css/ProductCard.css'

interface ProductCardProps {
    product: ProductType
}

function ProductCard(props: ProductCardProps) {

    const { id, title, price, description, category, image, rating } = props.product;

    const navigate = useNavigate();

    return (
        <Card className='card'>
            <img src={image} width={230} height={230} />
            <CardContent className='card-content'>
                <Typography gutterBottom variant="h5" component="div">
                    {title.substring(0, 70)}
                </Typography>
                <Typography variant="body2" className='card-Typography'>
                    {description.substring(0, 200)}...
                </Typography>
            </CardContent>
            <div>
                <h3 className='card-price'>{price}₺</h3>
            </div>
            <CardActions>
                <Button onClick={() => navigate("/product-detail/" + id)} size="small" variant='outlined' color='info'>Detay</Button>
            </CardActions>
        </Card>
    )
}

export default ProductCard