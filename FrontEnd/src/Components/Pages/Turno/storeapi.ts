const fetchData = async ( ) => {
  try {
    const response = await fetch('https://fakestoreapi.com/products');
    if (!response.ok) {
        throw new Error(`Error al realizar la solicitud: ${response.statusText}`);
      }
    const data:any =  await response.json();
    console.log(data)
  } catch (error) {
    console.log(error);
  }
};

fetchData();








