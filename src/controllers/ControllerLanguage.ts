import { Request, Response } from "express";
import { getRepository } from "typeorm";
import Language from "../models/Language";
import viewLanguage from "../views/viewLanguage";

type iLanguage = {
  name: string
}

export default {
  async create(req: Request, res: Response) {
    const languages = req.body as Array<iLanguage>;
    const repositoryLanguage = getRepository(Language);

    languages.forEach(async ({ name }) => {
      let newLanguage = new Language();
      newLanguage.name = name.toLowerCase();
      newLanguage.searched = 0;

      const verifyDuplicate = await repositoryLanguage.findOne({
        select: ['id', "searched"],
        where: [
          { 'name': newLanguage.name }
        ]
      });

      if (verifyDuplicate) {
        await repositoryLanguage.update(verifyDuplicate.id, { searched: verifyDuplicate.searched + 1 })
      } else {
        await repositoryLanguage.save(newLanguage);
      }
    })

    return res.status(201).json(languages);
  },

  async index(req: Request, res: Response) {
    const repositoryLanguage = getRepository(Language);

    const languages = await repositoryLanguage.find({ order: { 'searched': 'DESC' } });

    res.status(200).json(viewLanguage.renderMany(languages));
  }
}