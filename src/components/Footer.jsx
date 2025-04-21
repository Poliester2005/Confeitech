import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faInstagram } from '@fortawesome/free-brands-svg-icons';

export default function Footer() {
  return (
    <div className="bg-lavender py-6 w-full"> {/* Aumentei o padding vertical */}
      <footer className="text-center">
        <div className="flex flex-col items-center mb-4"> {/* Aumentei a margem inferior */}
          {/* Ícones de redes sociais */}
          <div className="flex justify-center space-x-6"> {/* Aumentei o espaço entre os ícones */}
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faFacebookF} className="text-gray-600 hover:text-baby-blue transition duration-300" size="2x" /> {/* Aumentei o tamanho do ícone */}
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faInstagram} className="text-gray-600 hover:text-baby-blue transition duration-300" size="2x" /> {/* Aumentei o tamanho do ícone */}
            </a>
          </div>
          {/* Nomes das redes sociais */}
          <div className="mt-3 text-gray-600 text-lg"> {/* Aumentei o tamanho da fonte */}
            <span>Facebook</span>
            <span className="mx-2">.</span>
            <span>Instagram</span>
          </div>
        </div>
        {/* Endereço fictício */}
        <p className="text-gray-600 text-sm mt-2">
          Rua Haddock Lobo, 595 - Bairro Cerqueira César, São Paulo - SP, Brasil
        </p>
        <p className="text-gray-600 text-sm">
          &copy; 2025 Confeitech. Todos os direitos reservados.
        </p>
      </footer>
    </div>
  );
}
