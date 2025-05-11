import styled from 'styled-components';

export const Box = styled.div`

padding: 60px 60px;
background:   #1C2833  ;
position: relative;
bottom: 0;
width: 100%;




@media (max-width: 1000px) {
	padding: 70px 30px;
}
`;

export const Container = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	max-width: 1000px;
	margin: 0 auto;
	
	/* background: red; */
`

export const Column = styled.div`
display: flex;
flex-direction: column;
text-align: left;
margin-left: 60px;

`;

export const Row = styled.div`
display: grid;
grid-template-columns: repeat(auto-fill,
						minmax(185px, 1fr));
grid-gap: 20px;

@media (max-width: 1000px) {
	grid-template-columns: repeat(auto-fill,
						minmax(200px, 1fr));
}
`;

export const FooterLink = styled.a`
color:  #f0ad4e ;
margin-bottom: 20px;
font-size: 20px;
text-decoration: none;
font family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif
font-weight: bolder;

&:hover {
	color: #391E46;
	transition: 200ms ease-in;
}
`;

export const Heading = styled.p`
font-size: 24px;
color: #f0ad4e;
margin-bottom: 40px;
font-weight: bold;
`;
