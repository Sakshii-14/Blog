import { Client, ID, Databases, Storage,Query } from "appwrite";
import conf from "../config/conf";

export class Service {
  client = new Client();
  databases;
  storage;

  constructor() {
    this.client
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId);
    this.databases = new Databases(this.client);
    this.storage = new Storage(this.client);
  }

  async createPost({ title, slug, content, featuredImage, status, userId }) {
    try {
      return await this.databases.createDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug,
        {
          title,
          content,
          featuredImage,
          status,
          userId,
        }
      );
    } catch (error) {
      console.log("Appwrite service :: createPost::error ", error);
    }
  }

  async updatePost(slug, { title, content, featuredImage, status }) {
    try {
      return await this.databases.updateDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug,
        {
          title,
          content,
          featuredImage,
          status,
        }
      );
    } catch (error) {
      console.log("Appwrite service::updatePost::error ", error);
    }
  }

  async deletePost(slug) {
    try {
      await this.databases.deleteDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug
      );
      return true;
    } catch (error) {
      console.log("Appwrite service:: deletePost :: error", error);
      return false;
    }
  }

  async getPost(slug) {
    try {
      return await this.databases.getDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug
      );
    } catch (error) {
      console.log("Appwrite service:: getPost:: error", error);
      return false;
    }
  }

  async listPosts(value='') {
    try {
      if(!value)
      {
        return await this.databases.listDocuments(
          conf.appwriteDatabaseId,
          conf.appwriteCollectionId,
          [Query.equal("status", ["active"])]
        );
      }
      return await this.databases.listDocuments(
          conf.appwriteDatabaseId,
          conf.appwriteCollectionId,
          [Query.equal("userId",`${value}`)]
      )
      
    } catch (error) {
      console.log("Appwrite service:: listPosts ::error ", error);
      return false;
    }
  }

  //file upload methods
  async uploadFile(file) {
    try {
      return await this.storage.createFile(
        conf.appwriteBucketId,
        ID.unique(),
        file
      );
    } catch (error) {
      console.log("Appwrite service::uploadFile::error", error);
      return false;
    }
  }

  async deletefile(fileid) {
    try {
      await this.storage.deleteFile(conf.appwriteBucketId, fileid);
      return true;
    } catch (error) {
      console.log("Appwrite service::deleteFile::error", error);
      return false;
    }
  }

  getfilePreview(fileid) {
    try {
      return this.storage.getFilePreview(conf.appwriteBucketId, fileid);
    } catch (error) {
      console.log("Appwrite service::getfilePreview::error", error);
    }
  }
}

const service = new Service();
export default service;
