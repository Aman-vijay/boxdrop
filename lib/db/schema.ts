import {pgTable,uuid,text,integer,boolean,timestamp} from "drizzle-orm/pg-core"
import { relations } from "drizzle-orm"

export const files = pgTable("files",{
    id:uuid("id").defaultRandom().primaryKey(),

    name:text("name").notNull(),
    path:text("path").notNull(),
    size:integer("size").notNull(),
    type:text("type").notNull(),

    //storage information
    fileUrl:text("file_url").notNull(),
    thumbnail:text("thumbnail_url"),

    //OwnerShip 
    userId:text("userId").notNull(),
    parentId: uuid("parent_Id"),

    //file-flags
    isFolder:boolean("is_folder").default(false).notNull(),
    isStarred:boolean("is_starred").default(false).notNull(),
    isTrash:boolean("is_trash").default(false).notNull(),
    created_At:timestamp("created_At").defaultNow().notNull(),
    updated_At:timestamp("updated_At").defaultNow().notNull(),







    
})