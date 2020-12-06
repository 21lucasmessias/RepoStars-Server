import { Request, Response } from "express";

import axios from 'axios';

import { getRepository } from "typeorm";
import Language from "../models/Language";

type iRepo = {
  picture: string,
  name: string,
  repo: string,
  link: string,
  about: string,
  stars: number,
  forks: number
}

type iData = {
  items: Array<{
    name: string,
    owner: {
      login: string,
      avatar_url: string
    },
    description: string,
    html_url: string,
    forks: number,
    stargazers_count: number,
  }>
}

export default {
  async show(req: Request, res: Response) {
    const { name, page } = req.query;

    const repositoryLanguage = getRepository(Language);

    const verifyExistLanguage = await repositoryLanguage.findOne({
      select: ['id', "searched"],
      where: [
        { 'name': (name as string).toLowerCase() }
      ]
    });

    if (verifyExistLanguage) {
      await repositoryLanguage.update(verifyExistLanguage.id, { searched: verifyExistLanguage.searched + 1 })
    }

    try {
      const gitResponse = await axios.get('https://api.github.com/search/repositories', {
        params: {
          q: `language:${name}`,
          sort: 'stars',
          page: page
        }
      });

      let repositories: Array<iRepo> = [];

      (gitResponse.data as iData).items.forEach((item) => {
        repositories = [...repositories, {
          picture: item.owner.avatar_url || '',
          name: item.owner.login || '',
          repo: item.name || '',
          link: item.html_url || '',
          about: item.description || '',
          stars: item.stargazers_count || 0,
          forks: item.forks || 0,
        }];
      });

      return res.status(200).json(repositories);
    } catch (e) {
      return res.status(404).json({ message: 'Language not found.' })
    }
  }
}