import db from '../postgres.database';


async function runMigration() {
  try {
    // Conecta ao banco de dados
    const client = await db.connect();

    // Executa o arquivo SQL de migração
    await client.query(`DO $$
    BEGIN
      CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
        IF NOT EXISTS (SELECT 1 FROM pg_tables WHERE tablename = 'customer') THEN
            -- Criação da tabela de clientes
            CREATE TABLE customers (
                id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
                name VARCHAR(255) NOT NULL,
                email VARCHAR(255) NOT NULL,
                phone VARCHAR(20) NOT NULL,
                x_axis FLOAT,
                y_axis FLOAT,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        END IF;
    END $$;`);

    // Libera o cliente
    client.release();
    
    console.log('Migração concluída com sucesso');
  } catch (error) {
    console.error('Erro ao executar a migração:', error);
  } finally {
    // Fecha a pool de conexões com o banco de dados
    await db.end();
  }
}

// Executa a função de migração
runMigration();
