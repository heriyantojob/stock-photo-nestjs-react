import React from 'react'
import IconButton from '@mui/material/IconButton';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { styled } from '@mui/material/styles';
const ExpandMoreStyled = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
  })(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  }));

  
  function ExpandMoreCustom({expanded,setExpanded}) {
    const handleExpandClick = () => {
        setExpanded(!expanded);
      };
    return (
        <ExpandMoreStyled
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
     
        <ExpandMoreIcon />
      </ExpandMoreStyled>
    )
  }
  
  export default ExpandMoreCustom