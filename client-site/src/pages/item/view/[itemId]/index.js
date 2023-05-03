import ProductDetail from "../../../../components/molecules/Products/ProductDetail";
import MainLayout from "../../../../components/organisms/MainLayout/MainLayout";

function ProductDetails() {
  return (
    <MainLayout>
      <ProductDetail
        image="https://ik.imagekit.io/0etyjok5b/20230416_bildueberlagerung_zBG9DOG5b.png"
        name="Sate Padang"
        price="3.5"
        description="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
      /> 
    </MainLayout>
        
  );
}

export async function getStaticPaths() {
  return {
    fallback: false,
    paths: [
      {
        params: {
          itemId: 'p1',
        },
      },
      {
        params: {
          itemId: 'p2',
        },
      },
    ]
  }
  }

export async function getStaticProps(context) {
  const itemId = context.params.itemId;
  console.log(itemId);

  return {
    props: {
      productData: {
        image: 'https://ik.imagekit.io/0etyjok5b/20230416_bildueberlagerung_zBG9DOG5b.png',
        id: itemId,
        title: 'Sate Padang',
        price: '3.5',
        description: 'Test makanan',
      }
    }
  }
}

export default ProductDetails;