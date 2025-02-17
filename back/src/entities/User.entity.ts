import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  /**
   * Username del usuario.
   * @example 'John Doe'
   */
  @ApiProperty({
    example: 'John Doe',
    description: 'Username del usuario.',
  })
  @Column()
  username: string;


    /**
   * Correo electrónico asociado a las credenciales.
   * @example 'user@example.com'
   */
    @ApiProperty({
      example: 'user@example.com',
      description: 'Correo electrónico asociado a las credenciales.',
    })
  @Column()
  email: string;


  /**
   * Contraseña asociada a las credenciales.
   * @example 'StrongPassword123'
   */
  @ApiProperty({
    example: 'StrongPassword123',
    description: 'Contraseña asociada a las credenciales.',
  })
  @Column()
  password: string;
}
