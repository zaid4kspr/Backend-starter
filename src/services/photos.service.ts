import { EntityRepository, Repository } from 'typeorm';
import { Service } from 'typedi';
import { PhotoEntity } from '@/entities/photos.entity';
import { Photo } from '@/interfaces/photos.interface';
import { PhotoDto } from '@/dtos/photos.dto';

@Service()
@EntityRepository()
export class PhotoService extends Repository<PhotoEntity> {
  public async findAllPhotos(): Promise<Photo[]> {
    const photos: Photo[] = await PhotoEntity.find();
    return photos;
  }

  public async createPhoto(photoData: PhotoDto[]): Promise<Photo[]> {
    const photoEntities: Photo[] = PhotoEntity.create(photoData);
    await PhotoEntity.insert(photoEntities);
    return photoEntities;
  }
}
