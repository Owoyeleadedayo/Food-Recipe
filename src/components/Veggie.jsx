import { useEffect, useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";



function Veggie() {
  const [veggie, setVeggie] = useState([])

  useEffect(() => {
    getVeggie();
  }, []);

  const getVeggie = async () => {

     
    const check = localStorage.getItem('veggie')


    if(check){
      setVeggie(JSON.parse(check))
    }else{
      const api = await fetch(`https://api.spoonacular.com/recipes/random?apiKey=${process.env.REACT_APP_API_KEY}&number=9&tags=vegetarian`);
      const data = await api.json();

      localStorage.setItem("veggie",JSON.stringify(data.recipes))
      setVeggie(data.recipes);
    } 

  };
  return (
    <div>
      <Wrapper>
          <h3>Our Veggie picks</h3>
          <SplideWrap>
            {veggie.map((recipe) => {
              return(
                <div key={recipe.id}> 
                  <Card>
                    <Link to={"/recipe/" + recipe.id}>
                      <p>{recipe.title}</p>
                      <img src={recipe.image} alt={recipe.title} />
                      <Gradient />
                    </Link>
                  </Card>
                </div>
              );
            })}
          </SplideWrap>
      </Wrapper>
    </div>
  );
}

const Wrapper = styled.div`
  margin: 3rem 0rem;
  overflow-x: scroll;
  &::-webkit-scrollbar{
    display: none;
  }
`;

const Card = styled.div`
  min-height: 18rem;
  width: 15rem;
  border-radius: 2rem;
  overflow: hidden;
  margin: 0px 15px;
  position: relative;

  img{
    border-radius: 2rem;
    object-fit: cover;
    left: 0;
    width: 100%;
    height: 100%;
    position: absolute;
  }
  p {
    position: absolute;
    z-index: 10;
    left: 50%;
    bottom: 0%;
    transform: translate(-50%, 0%);
    color: white;
    width: 100%;
    text-align: center;
    font-weight: 600;
    font-size: 1rem;
    height: 40%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

const Gradient = styled.div`
  z-index: 3;
  position: absolute;
  width: 100%;
  height: 100%;
  background: linear-gradient(rgba(0,0,0,0), rgba(0,0,0,0.5));
`;

const SplideWrap = styled.div`
  display: flex;
  justify-content: space-between;
  overflow-x: scroll;
  &::-webkit-scrollbar{
    display: none;
  }
`
export default Veggie;