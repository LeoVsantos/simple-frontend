import { useProducts } from "../../hooks/useProducts";
import { Container } from "./styles";

export function ProductListTable() {
  const { products } = useProducts();

  return (
    <Container>
      <table>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Descricao</th>
            <th>Preco</th>
            <th>Peso</th>
            <th>Data</th>
          </tr>
        </thead>

    <tbody>

      {products.map(product => (
        <tr key={product.id}>
          <td>{product.name}</td>
          <td>{product.description}</td>

          <td>
            {new Intl.NumberFormat('pt-BR', {
              style: 'currency',
              currency: 'BRL'
            }).format(Number(product.price))}
          </td>
          <td>{product.weight}g</td>
          <td>
          {new Intl.DateTimeFormat('pt-BR').format(product.createdAt)}
          </td>
        </tr>
      ))}
    </tbody>
      </table>
    </Container>
  )
}