import { PageContent } from "./pageContent.model";
import { IPageContent } from "./pageContent.interface";

const getPageContent = async (pageSlug: string) => await PageContent.findOne({ pageSlug });

const updatePageContent = async (pageSlug: string, payload: Partial<IPageContent>) => {
  // Jodi page age theke thake tahole update korbe, na thakle notun toiri korbe (upsert)
  const result = await PageContent.findOneAndUpdate(
    { pageSlug },
    { ...payload, pageSlug }, 
    { returnDocument: 'after', upsert: true }
  );
  return result;
};

export const PageContentService = { getPageContent, updatePageContent };