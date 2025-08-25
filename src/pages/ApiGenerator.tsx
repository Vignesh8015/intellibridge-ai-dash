import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Zap,
  Code,
  Copy,
  Download,
  Play,
  CheckCircle,
  Globe,
  Database,
} from "lucide-react";

// Mock generated API endpoints
const restEndpoints = [
  {
    method: "GET",
    path: "/api/users",
    description: "Retrieve all users",
    parameters: ["page", "limit", "sort"],
    response: "UserList",
  },
  {
    method: "GET",
    path: "/api/users/{id}",
    description: "Get user by ID",
    parameters: ["id"],
    response: "User",
  },
  {
    method: "POST",
    path: "/api/users",
    description: "Create new user",
    parameters: [],
    response: "User",
  },
  {
    method: "PUT",
    path: "/api/users/{id}",
    description: "Update user",
    parameters: ["id"],
    response: "User",
  },
  {
    method: "DELETE",
    path: "/api/users/{id}",
    description: "Delete user",
    parameters: ["id"],
    response: "Success",
  },
];

const restImplementation = `// Spring Boot REST Controller
@RestController
@RequestMapping("/api/users")
@Validated
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping
    public ResponseEntity<PagedResponse<UserDTO>> getAllUsers(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int limit,
            @RequestParam(defaultValue = "id") String sort) {
        
        PagedResponse<UserDTO> users = userService.getAllUsers(page, limit, sort);
        return ResponseEntity.ok(users);
    }

    @GetMapping("/{id}")
    public ResponseEntity<UserDTO> getUserById(@PathVariable Long id) {
        UserDTO user = userService.getUserById(id);
        return ResponseEntity.ok(user);
    }

    @PostMapping
    public ResponseEntity<UserDTO> createUser(@Valid @RequestBody CreateUserRequest request) {
        UserDTO user = userService.createUser(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(user);
    }

    @PutMapping("/{id}")
    public ResponseEntity<UserDTO> updateUser(
            @PathVariable Long id, 
            @Valid @RequestBody UpdateUserRequest request) {
        UserDTO user = userService.updateUser(id, request);
        return ResponseEntity.ok(user);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable Long id) {
        userService.deleteUser(id);
        return ResponseEntity.noContent().build();
    }
}

// DTOs and Request Objects
@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserDTO {
    private Long id;
    private String username;
    private String email;
    private String firstName;
    private String lastName;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}

@Data
@Validated
public class CreateUserRequest {
    @NotBlank
    @Size(min = 3, max = 50)
    private String username;
    
    @NotBlank
    @Email
    private String email;
    
    @NotBlank
    private String firstName;
    
    @NotBlank
    private String lastName;
}`;

const graphqlSchema = `# GraphQL Schema for User Management
type User {
  id: ID!
  username: String!
  email: String!
  firstName: String!
  lastName: String!
  createdAt: DateTime!
  updatedAt: DateTime!
}

type Query {
  users(page: Int = 0, limit: Int = 10, sort: String = "id"): UserConnection!
  user(id: ID!): User
}

type Mutation {
  createUser(input: CreateUserInput!): User!
  updateUser(id: ID!, input: UpdateUserInput!): User!
  deleteUser(id: ID!): Boolean!
}

input CreateUserInput {
  username: String!
  email: String!
  firstName: String!
  lastName: String!
}

input UpdateUserInput {
  username: String
  email: String
  firstName: String
  lastName: String
}

type UserConnection {
  edges: [UserEdge!]!
  pageInfo: PageInfo!
}

type UserEdge {
  node: User!
}

type PageInfo {
  hasNextPage: Boolean!
  hasPreviousPage: Boolean!
  startCursor: String
  endCursor: String
}

scalar DateTime`;

const graphqlResolvers = `// GraphQL Resolvers
@Component
public class UserResolver implements GraphQLQueryResolver, GraphQLMutationResolver {

    @Autowired
    private UserService userService;

    // Query resolvers
    public UserConnection users(int page, int limit, String sort) {
        PagedResponse<User> pagedUsers = userService.getAllUsers(page, limit, sort);
        return UserConnection.fromPagedResponse(pagedUsers);
    }

    public User user(String id) {
        return userService.getUserById(Long.parseLong(id));
    }

    // Mutation resolvers
    public User createUser(CreateUserInput input) {
        return userService.createUser(input);
    }

    public User updateUser(String id, UpdateUserInput input) {
        return userService.updateUser(Long.parseLong(id), input);
    }

    public Boolean deleteUser(String id) {
        userService.deleteUser(Long.parseLong(id));
        return true;
    }
}`;

const ApiGenerator = () => {
  const [selectedEndpoints, setSelectedEndpoints] = useState<string[]>([]);
  const [generatedCode, setGeneratedCode] = useState<boolean>(false);

  const handleGenerateApis = () => {
    setGeneratedCode(true);
  };

  const toggleEndpoint = (path: string) => {
    setSelectedEndpoints(prev =>
      prev.includes(path)
        ? prev.filter(p => p !== path)
        : [...prev, path]
    );
  };

  const copyToClipboard = (content: string) => {
    navigator.clipboard.writeText(content);
  };

  const getMethodColor = (method: string) => {
    switch (method) {
      case "GET":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200";
      case "POST":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
      case "PUT":
        return "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200";
      case "DELETE":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200";
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">API Adapter Generator</h1>
        <p className="text-muted-foreground">
          Generate modern REST and GraphQL APIs for your legacy systems with
          AI-powered endpoint discovery and implementation.
        </p>
      </div>

      {/* Detected Endpoints */}
      <Card className="card-enterprise">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Globe className="mr-2 h-5 w-5" />
            Discovered Legacy Endpoints
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {restEndpoints.map((endpoint, index) => (
              <div
                key={index}
                className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                  selectedEndpoints.includes(endpoint.path)
                    ? "border-primary bg-primary/5"
                    : "border-border hover:border-primary/50"
                }`}
                onClick={() => toggleEndpoint(endpoint.path)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Badge className={getMethodColor(endpoint.method)}>
                      {endpoint.method}
                    </Badge>
                    <code className="font-mono text-sm bg-secondary px-2 py-1 rounded">
                      {endpoint.path}
                    </code>
                    <span className="text-sm text-muted-foreground">
                      {endpoint.description}
                    </span>
                  </div>
                  {selectedEndpoints.includes(endpoint.path) && (
                    <CheckCircle className="h-5 w-5 text-primary" />
                  )}
                </div>
                {endpoint.parameters.length > 0 && (
                  <div className="mt-2 flex items-center space-x-2">
                    <span className="text-xs text-muted-foreground">Parameters:</span>
                    {endpoint.parameters.map((param) => (
                      <Badge key={param} variant="outline" className="text-xs">
                        {param}
                      </Badge>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Generation Controls */}
      <Card className="card-enterprise">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Code className="mr-2 h-5 w-5" />
            API Generation Options
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Base Package</label>
              <Input defaultValue="com.intellibridge.api" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">API Version</label>
              <Input defaultValue="v1" />
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Selected Endpoints</p>
              <p className="text-sm text-muted-foreground">
                {selectedEndpoints.length} of {restEndpoints.length} endpoints selected
              </p>
            </div>
            <Button
              onClick={handleGenerateApis}
              disabled={selectedEndpoints.length === 0}
              className="flex items-center"
            >
              <Play className="mr-2 h-4 w-4" />
              Generate API Code
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Generated Code */}
      {generatedCode && (
        <div className="space-y-6">
          <div className="flex items-center space-x-2">
            <CheckCircle className="h-5 w-5 text-success" />
            <h2 className="text-xl font-semibold">Generated API Implementation</h2>
          </div>

          <Tabs defaultValue="rest" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="rest">REST API</TabsTrigger>
              <TabsTrigger value="graphql">GraphQL</TabsTrigger>
            </TabsList>

            <TabsContent value="rest" className="space-y-4">
              <Card className="card-enterprise">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>Spring Boot Controller</span>
                    <div className="flex space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => copyToClipboard(restImplementation)}
                      >
                        <Copy className="mr-2 h-4 w-4" />
                        Copy
                      </Button>
                      <Button variant="outline" size="sm">
                        <Download className="mr-2 h-4 w-4" />
                        Download
                      </Button>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Textarea
                    value={restImplementation}
                    readOnly
                    className="font-mono text-sm min-h-[500px] resize-none"
                  />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="graphql" className="space-y-4">
              <div className="grid gap-4">
                <Card className="card-enterprise">
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span>GraphQL Schema</span>
                      <div className="flex space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => copyToClipboard(graphqlSchema)}
                        >
                          <Copy className="mr-2 h-4 w-4" />
                          Copy
                        </Button>
                        <Button variant="outline" size="sm">
                          <Download className="mr-2 h-4 w-4" />
                          Download
                        </Button>
                      </div>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Textarea
                      value={graphqlSchema}
                      readOnly
                      className="font-mono text-sm min-h-[300px] resize-none"
                    />
                  </CardContent>
                </Card>

                <Card className="card-enterprise">
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span>GraphQL Resolvers</span>
                      <div className="flex space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => copyToClipboard(graphqlResolvers)}
                        >
                          <Copy className="mr-2 h-4 w-4" />
                          Copy
                        </Button>
                        <Button variant="outline" size="sm">
                          <Download className="mr-2 h-4 w-4" />
                          Download
                        </Button>
                      </div>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Textarea
                      value={graphqlResolvers}
                      readOnly
                      className="font-mono text-sm min-h-[300px] resize-none"
                    />
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      )}
    </div>
  );
};

export default ApiGenerator;