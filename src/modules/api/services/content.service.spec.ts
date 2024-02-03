import { Test, TestingModule } from '@nestjs/testing';
import { ContentService } from './content.service';
import { PrismaService } from '../../../database/PrismaService';
import { NotFoundException } from '@nestjs/common';

const prismaServiceMock = {
  apiContent: {
    create: jest.fn(),
    findMany: jest.fn(),
    findUnique: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  },
};

describe('ContentService', () => {
  let contentService: ContentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ContentService,
        { provide: PrismaService, useValue: prismaServiceMock },
      ],
    }).compile();

    contentService = module.get<ContentService>(ContentService);
  });

  describe('create', () => {
    it('should create content', async () => {
      const testData = {
        id: '1',
        aboutPage: 'Some about page content',
      };

      prismaServiceMock.apiContent.create.mockResolvedValue(testData);

      const result = await contentService.create(testData);

      expect(result).toEqual(testData);
      expect(prismaServiceMock.apiContent.create).toHaveBeenCalledWith({
        data: testData,
      });
    });
  });

  describe('findAll', () => {
    it('should return all contents', async () => {
      const testData = [
        { id: '1', aboutPage: 'Content 1' },
        { id: '2', aboutPage: 'Content 2' },
      ];

      prismaServiceMock.apiContent.findMany.mockResolvedValue(testData);

      const result = await contentService.findAll();

      expect(result).toEqual(testData);
      expect(prismaServiceMock.apiContent.findMany).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return content with a given id', async () => {
      const testData = { id: '1', aboutPage: 'Content 1' };

      prismaServiceMock.apiContent.findUnique.mockResolvedValue(testData);

      const result = await contentService.findOne('1');

      expect(result).toEqual(testData);
      expect(prismaServiceMock.apiContent.findUnique).toHaveBeenCalledWith({
        where: { id: '1' },
      });
    });

    it('should throw NotFoundException when content is not found', async () => {
      prismaServiceMock.apiContent.findUnique.mockResolvedValue(null);

      await expect(contentService.findOne('nonexistent')).rejects.toThrowError(
        NotFoundException,
      );
    });
  });

  describe('update', () => {
    it('should update content with a given id', async () => {
      const testData = { id: '1', aboutPage: 'Updated Content' };

      prismaServiceMock.apiContent.findUnique.mockResolvedValue({
        id: '1',
        aboutPage: 'Old Content',
      });

      prismaServiceMock.apiContent.update.mockResolvedValue(testData);

      const result = await contentService.update('1', testData);

      expect(result).toEqual(testData);
      expect(prismaServiceMock.apiContent.findUnique).toHaveBeenCalledWith({
        where: { id: '1' },
      });
      expect(prismaServiceMock.apiContent.update).toHaveBeenCalledWith({
        where: { id: '1' },
        data: testData,
      });
    });

    it('should throw NotFoundException when content is not found', async () => {
      prismaServiceMock.apiContent.findUnique.mockResolvedValue(null);

      await expect(
        contentService.update('nonexistent', {} as any),
      ).rejects.toThrowErrorMatchingSnapshot('not found');
    });
  });

  describe('delete', () => {
    it('should delete content with a given id', async () => {
      prismaServiceMock.apiContent.findUnique.mockResolvedValue({
        id: '1',
        aboutPage: 'Old Content',
      });

      prismaServiceMock.apiContent.delete.mockResolvedValue({ id: '1' });

      const result = await contentService.delete('1');

      expect(result).toEqual({ id: '1' });
      expect(prismaServiceMock.apiContent.findUnique).toHaveBeenCalledWith({
        where: { id: '1' },
      });
      expect(prismaServiceMock.apiContent.delete).toHaveBeenCalledWith({
        where: { id: '1' },
      });
    });

    it('should throw NotFoundException when content is not found', async () => {
      prismaServiceMock.apiContent.findUnique.mockResolvedValue(null);

      await expect(contentService.delete('nonexistent')).rejects.toThrowError(
        NotFoundException,
      );
    });
  });
});
