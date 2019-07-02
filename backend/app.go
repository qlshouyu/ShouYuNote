package main
import(
	"log"
	"net/http"
	"github.com/emicklei/go-restful"
)
func main()  {
	wsContainer := restful.NewContainer()
	wsContainer.Router(restful.CurlyRouter{})
	u := UserController{map[string]User{}}
	u.Register(wsContainer)

	log.Printf("start listening on localhost:8080")
	server := &http.Server{Addr: ":8080", Handler: wsContainer}
	log.Fatal(server.ListenAndServe())
}

type User struct {
	Id, Name, pwd string
}

type UserController struct {
	users map[string]User
}


func (u *UserController) Register(container *restful.Container) {
	ws := new(restful.WebService)
	ws.Path("/users").
			Consumes(restful.MIME_XML, restful.MIME_JSON).
			Produces(restful.MIME_JSON, restful.MIME_XML) // you can specify this per route as well

	ws.Route(ws.GET("/{user-id}").To(u.findUser))
	ws.Route(ws.PUT("/{user-id}").To(u.createUser))
	container.Add(ws)
}

func (u *UserController) findUser(request *restful.Request, response *restful.Response) {
	id := request.PathParameter("user-id")
	usr , ok := u.users[id]
	if !ok {
			response.AddHeader("Content-Type", "text/json")
			response.WriteErrorString(http.StatusNotFound, "User could not be found.")
	} else {
			response.WriteEntity(usr)
	}
}

func (u *UserController) createUser(request *restful.Request, response *restful.Response) {
	usr := User{Id: request.PathParameter("user-id")}
	err := request.ReadEntity(&usr)
	if err == nil {
			u.users[usr.Id] = usr
			response.WriteHeaderAndEntity(http.StatusCreated, usr)
	} else {
			response.AddHeader("Content-Type", "text/json")
			response.WriteErrorString(http.StatusInternalServerError, err.Error())
	}
}