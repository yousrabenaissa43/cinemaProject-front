import { Component } from 'react';

class AccueilClass extends Component {
  render() {
    const styles = {
      container: {
        textAlign: 'center',
        padding: '50px',
        fontFamily: 'Arial, sans-serif',
        color: '#333',
        backgroundColor: '#f8f9fa',
        borderRadius: '10px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        maxWidth: '800px',
        margin: '50px auto',
      },
      title: {
        fontSize: '36px',
        fontWeight: 'bold',
        color: '#0066cc',
      },
      description: {
        fontSize: '18px',
        lineHeight: '1.6',
        color: '#555',
        marginTop: '20px',
      },
    };

    return (
      <div style={styles.container}>
        <h1 style={styles.title}>{"Bienvenue à l'Accueil du Cinéma"}</h1>
        <p style={styles.description}>
          Le cinéma est un art et une passion qui réunit les gens autour d'histoires captivantes. 
          Plongez dans des aventures épiques, des récits émouvants et des univers extraordinaires 
          grâce à une programmation variée qui satisfait tous les goûts.
        </p>
        <p style={styles.description}>
          Découvrez les derniers films à succès, participez à des séances spéciales et explorez 
          notre large sélection de genres, des comédies aux drames, en passant par les thrillers 
          et la science-fiction.
        </p>
        <p style={styles.description}>
          {"Rejoignez-nous pour vivre la magie du cinéma, un écran à la fois!"}
        </p>
      </div>
    );
  }
}

export default AccueilClass;
