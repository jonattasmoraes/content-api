import { Test, TestingModule } from '@nestjs/testing';
import { ProjectsService } from './projects.service';
import { PrismaService } from '../../../database/PrismaService';
import { NotFoundException } from '@nestjs/common';

const prismaServiceMock = {
  apiProjects: {
    create: jest.fn(),
    findMany: jest.fn(),
    findUnique: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  },
};

describe('ProjectsService', () => {
  let projectService: ProjectsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProjectsService,
        { provide: PrismaService, useValue: prismaServiceMock },
      ],
    }).compile();

    projectService = module.get<ProjectsService>(ProjectsService);
  });

  describe('create', () => {
    it('should create project', async () => {
      const testData = {
        id: 1,
        name: 'Project 1',
        year: '2022',
        urlIcon: 'https://example.com/icon.png',
        aboutProject: 'Project 1 description',
        infos: 'Project 1 infos',
        repositoryUrl: 'https://example.com/repository',
        deployUrl: 'https://example.com/deploy',
      };

      prismaServiceMock.apiProjects.create.mockResolvedValue(testData);

      const result = await projectService.create(testData);

      expect(result).toEqual(testData);
      expect(prismaServiceMock.apiProjects.create).toHaveBeenCalledWith({
        data: testData,
      });
    });
  });

  describe('findAll', () => {
    it('should return all contents', async () => {
      const testData = [
        {
          id: 1,
          name: 'Project 1',
          year: '2022',
          urlIcon: 'https://example.com/icon.png',
          aboutProject: 'Project 1 description',
          infos: 'Project 1 infos',
          repositoryUrl: 'https://example.com/repository',
          deployUrl: 'https://example.com/deploy',
        },
        {
          id: 2,
          name: 'Project 1',
          year: '2022',
          urlIcon: 'https://example.com/icon.png',
          aboutProject: 'Project 1 description',
          infos: 'Project 1 infos',
          repositoryUrl: 'https://example.com/repository',
          deployUrl: 'https://example.com/deploy',
        },
      ];

      prismaServiceMock.apiProjects.findMany.mockResolvedValue(testData);

      const result = await projectService.findAll();

      expect(result).toEqual(testData);
      expect(prismaServiceMock.apiProjects.findMany).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return Project with a given id', async () => {
      const testData = {
        id: 1,
        name: 'Project 1',
        year: '2022',
        urlIcon: 'https://example.com/icon.png',
        aboutProject: 'Project 1 description',
        infos: 'Project 1 infos',
        repositoryUrl: 'https://example.com/repository',
        deployUrl: 'https://example.com/deploy',
      };

      prismaServiceMock.apiProjects.findUnique.mockResolvedValue(testData);

      const result = await projectService.findOne(1);

      expect(result).toEqual(testData);
      expect(prismaServiceMock.apiProjects.findUnique).toHaveBeenCalledWith({
        where: { id: 1 },
      });
    });

    it('should throw NotFoundException when content is not found', async () => {
      prismaServiceMock.apiProjects.findUnique.mockResolvedValue(null);

      await expect(projectService.findOne(2)).rejects.toThrowError(
        NotFoundException,
      );
    });
  });

  describe('update', () => {
    it('should update content with a given id', async () => {
      const testData = {
        id: 1,
        name: 'Project 1',
        year: '2022',
        urlIcon: 'https://example.com/icon.png',
        aboutProject: 'Project 1 description',
        infos: 'Project 1 infos',
        repositoryUrl: 'https://example.com/repository',
        deployUrl: 'https://example.com/deploy',
      };

      prismaServiceMock.apiProjects.findUnique.mockResolvedValue({
        id: 2,
        name: 'Project 2',
        year: '2023',
        urlIcon: 'https://example.com/icon.png',
        aboutProject: 'Project 1 description',
        infos: 'Project 2 infos',
        repositoryUrl: 'https://example.com/repository',
        deployUrl: 'https://example.com/deploy',
      });

      prismaServiceMock.apiProjects.update.mockResolvedValue(testData);

      const result = await projectService.update(1, testData);

      expect(result).toEqual(testData);
      expect(prismaServiceMock.apiProjects.findUnique).toHaveBeenCalledWith({
        where: { id: 1 },
      });
      expect(prismaServiceMock.apiProjects.update).toHaveBeenCalledWith({
        where: { id: 1 },
        data: testData,
      });
    });
  });

  it('should throw NotFoundException when content is not found', async () => {
    prismaServiceMock.apiProjects.findUnique.mockResolvedValue(null);

    await expect(
      projectService.update(3, {} as any),
    ).rejects.toThrowErrorMatchingSnapshot('not found');
  });

  describe('delete', () => {
    it('should delete content with a given id', async () => {
      prismaServiceMock.apiProjects.findUnique.mockResolvedValue({
        id: 1,
        name: 'Project 1',
        year: '2022',
        urlIcon: 'https://example.com/icon.png',
        aboutProject: 'Project 1 description',
        infos: 'Project 1 infos',
        repositoryUrl: 'https://example.com/repository',
        deployUrl: 'https://example.com/deploy',
      });

      prismaServiceMock.apiProjects.delete.mockResolvedValue({ id: '1' });

      const result = await projectService.delete(1);

      expect(result).toEqual({ id: '1' });
      expect(prismaServiceMock.apiProjects.findUnique).toHaveBeenCalledWith({
        where: { id: 1 },
      });
      expect(prismaServiceMock.apiProjects.delete).toHaveBeenCalledWith({
        where: { id: 1 },
      });
    });

    it('should throw NotFoundException when content is not found', async () => {
      prismaServiceMock.apiProjects.findUnique.mockResolvedValue(null);

      await expect(projectService.delete(1)).rejects.toThrowError(
        NotFoundException,
      );
    });
  });
});
