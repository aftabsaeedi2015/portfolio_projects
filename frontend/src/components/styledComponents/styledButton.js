import {styled} from '@mui/system'
import { Button} from '@mui/material';
const StyledButton = styled(Button,{name: 'styledButton', slot: 'wrapper'})({
    color: (props) => props.bcolor,
    backgroundColor: 'white',
    border: '1px solid black',
    width: 'fit-content',
    marginTop: '2rem',
    borderRadius: '4',
    '&:hover': {
        color: 'white',
        backgroundColor: 'gray',
        transition: '0.3s'
      },
});

export default StyledButton
